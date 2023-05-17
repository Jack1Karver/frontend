import { driveType } from '@/config/enums/drive-type';
import { engineType } from '@/config/enums/engine-type';
import { gearboxType } from '@/config/enums/gearbox-type';
import EverWalletControllerWeb from '@/external/EverWalletControllerWeb';
import { ICarPrototype } from '@/interfaces/car.interface';
import { IFileInput } from '@/interfaces/file-input.interface';
import { IModel } from '@/interfaces/model.interface';
import { CarRequests } from '@/requests/car.requests';
import { removeEmptyParams, removeParagraphs } from '@/utils/common.utils';
import { getFileMeta } from '@/utils/files.utils';
import { getEverWalletClient } from '@/utils/wallet/client';
import { prototype } from 'events';
import { action, makeObservable, observable } from 'mobx';

export default class CreateStore {
  model: IModel | null = null;
  year_prod: number | null = null;
  engine_type: string = '';
  drive_type: string = '';
  gearbox_type: string = '';
  hp: number | null = null;
  engine_capacity: number | null = null;
  color: string = '';
  mileage: number | null = null;
  description: string = '';
  price: number | null = null;
  files: IFileInput[] = [];
  carPrototype: ICarPrototype | null = null;
  json: string = '';
  mintTransactionError: string | null = null;

  constructor() {
    makeObservable(this, {
      model: observable,
      year_prod: observable,
      engine_type: observable,
      drive_type: observable,
      gearbox_type: observable,
      hp: observable,
      engine_capacity: observable,
      color: observable,
      mileage: observable,
      description: observable,
      price: observable,
      files: observable,
      carPrototype: observable,
      setModel: action,
      setYearProd: action,
      setEngineType: action,
      setDriveType: action,
      setGearboxType: action,
      setHp: action,
      setEngineCapacity: action,
      setColor: action,
      setMileage: action,
      setDescription: action,
      setPrice: action,
      setFiles: action,
    });
  }

  setModel(model: IModel | null) {
    this.model = model;
  }

  setYearProd(year: number) {
    this.year_prod = year;
  }

  setEngineType(type: string) {
    this.engine_type = type;
  }

  setDriveType(type: string) {
    this.drive_type = type;
  }

  setGearboxType(type: string) {
    this.gearbox_type = type;
  }

  setHp(hp: number) {
    this.hp = hp;
  }

  setEngineCapacity(cap: number) {
    this.engine_capacity = cap;
  }

  setColor(color: string) {
    this.color = color;
  }

  setMileage(mileage: number) {
    this.mileage = mileage;
  }

  setDescription(desc: string) {
    this.description = desc;
  }

  setPrice(price: number) {
    this.price = price;
  }

  setFiles(files: IFileInput[]) {
    this.files = files;
  }

  setCarPrototype(carPrototype: ICarPrototype) {
    this.carPrototype = carPrototype;
  }

  setJson(json: string) {
    this.json = json;
  }

  async mint() {
    await this.createPrototype();

    if (!this.carPrototype) {
      return { error: 'Item creation failed.', status: 'ERROR' };
    }

    const json = await this.uploadFiles();


    if (!json) {
      await this.deletePrototype();
      return { error: 'Item creation failed.', status: 'ERROR' };
    }

    return {status: 'OK'}
  }

  async createPrototype() {
    if (this.model) {
      const carPrototype = await CarRequests.createPrototype({
        carFeatures: {
          model: this.model,
          yearProd: this.year_prod!,
          engineType: engineType[this.engine_type],
          gearboxType: gearboxType[this.gearbox_type],
          driveType: driveType[this.drive_type],
          hp: this.hp!,
          engineCapacity: this.engine_capacity!,
          color: this.color,
          mileage: this.mileage!,
        },
        description: this.description,
      });

      if (!carPrototype) {
        return { error: 'Item creation failed.', status: 'ERROR' };
      }
      this.setCarPrototype(carPrototype);
    }
  }

  async uploadFiles() {
    if (!this.files.length || !this.carPrototype) {
      return null;
    }
    const fileMetas = this.files.map(file => {
      return getFileMeta(file.file, file.src);
    });

    const uploadFileFields = {
      carId: JSON.stringify(this.carPrototype.id),
      files: this.files.map(file => file.file),
      fileMeta: JSON.stringify(fileMetas),
    };

    const carProtoWithFiles = await CarRequests.uploadFile(removeEmptyParams(uploadFileFields));

    if (!carProtoWithFiles.json) {
      this.deletePrototype();

      return null;
    }
    this.setJson(carProtoWithFiles.json);
    this.setCarPrototype(carProtoWithFiles);

    return carProtoWithFiles.json;
  }

  async deletePrototype() {
    if (this.carPrototype && this.carPrototype.id) {
      await CarRequests.deletePrototype(this.carPrototype.id);
      this.carPrototype = null;
    }
  }

  async sendMintTransaction(): Promise<void> {
    const { carPrototype } = this;
    console.log('sendTransaction')

    if (!carPrototype || !carPrototype.json) {
      throw new Error('');
    }

    this.setMintTransactionError('');
    const walletTransactionService = new EverWalletControllerWeb(getEverWalletClient());

    if(carPrototype.carFeatures.id){
    const transactionResult = await walletTransactionService.mintToken({
      name: JSON.stringify(carPrototype.carFeatures.id),
      url: carPrototype.json,
    }
    );
      console.log(transactionResult)
    if (transactionResult?.error) {
      this.setMintTransactionError(transactionResult?.error?.message ?? 'Item creation failed.');
    }
  }
  }

  setMintTransactionError = (error: string | null) => {
    this.mintTransactionError = error;
  };

  reset() {
    this.model = null;
    this.year_prod = null;
    this.engine_type = '';
    this.drive_type = '';
    this.gearbox_type = '';
    this.hp = null;
    this.engine_capacity = null;
    this.color = '';
    this.mileage = null;
    this.description = '';
    this.files = [];
  }
}
