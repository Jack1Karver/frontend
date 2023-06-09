const IndexContract = {
    abi: {
        "ABI version": 2,
        "header": [
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [
                    {
                        "name": "root",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getInfo",
                "inputs": [],
                "outputs": [
                    {
                        "name": "addrRoot",
                        "type": "address"
                    },
                    {
                        "name": "addrOwner",
                        "type": "address"
                    },
                    {
                        "name": "addrData",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "destruct",
                "inputs": [],
                "outputs": []
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "_addrData",
                "type": "address"
            }
        ],
        "events": []
    },
    tvc: "te6ccgECGQEAA0AAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAgaK2zUYBAQkiu1TIOMDIMD/4wIgwP7jAvILFQYFFwLUjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE+Gkh2zzTAAGfgQIA1xgg+QFY+EL5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAfgjvPK50x8B2zz4R27yfA4HAUIi0NMD+kAw+GmpOADcIccA3CHXDR/yvCHdAds8+Edu8nwHAzwgghAV78DauuMCIIIQR1ZU3LrjAiCCEEfGLdq64wIRCggDHDD4Qm7jANHbPNs8f/hnFAkSADT4SfhMxwXy4GT4TMjPhQjOgG/PQMmBAKD7AATyMPhCbuMA+Ebyc3/4ZvpBldTR0PpA39H4QYjIz44rbNbMzsnbPCBu8tBoXyBu8n/Q+kD6QDD4SfhMxwXy4GT4ACH4aiD4ayGNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATHBZMj+GreXwTbPH/4Zw4YCxICGNAgizits1jHBYqK4gwNAQrXTdDbPA0AQtdM0IsvSkDXJvQEMdMJMYsvShjXJiDXSsIBktdNkjBt4gIW7UTQ10nCAYqOgOIUDwH+cO1E0PQFjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE+GqNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT4a3EhgED0Do4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE3xAAJvhsgED0DvK91wv/+GJw+GNw+GYDfjD4Qm7jANHbPCOOKiXQ0wH6QDAxyM+HIM5xzwthXhFVIMjPkle/A2rOWcjOAcjOzc3NyXD7AJJfA+LjAH/4ZxQTEgA++Ez4S/hK+Eb4Q/hCyMv/yz/KAM5ZyM4ByM7NzcntVAAM+Er4S/hMAETtRNDT/9M/0gD6QNTR0PpA1NHQ+kDR+Gz4a/hq+Gb4Y/hiAgr0pCD0oRcWABRzb2wgMC40Ny4wAAAADCD4Ye0e2Q==",
    code: "te6ccgECFgEAAxMAAgaK2zUVAQQkiu1TIOMDIMD/4wIgwP7jAvILEgMCFALUjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE+Gkh2zzTAAGfgQIA1xgg+QFY+EL5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAfgjvPK50x8B2zz4R27yfAsEAUIi0NMD+kAw+GmpOADcIccA3CHXDR/yvCHdAds8+Edu8nwEAzwgghAV78DauuMCIIIQR1ZU3LrjAiCCEEfGLdq64wIOBwUDHDD4Qm7jANHbPNs8f/hnEQYPADT4SfhMxwXy4GT4TMjPhQjOgG/PQMmBAKD7AATyMPhCbuMA+Ebyc3/4ZvpBldTR0PpA39H4QYjIz44rbNbMzsnbPCBu8tBoXyBu8n/Q+kD6QDD4SfhMxwXy4GT4ACH4aiD4ayGNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATHBZMj+GreXwTbPH/4ZwsVCA8CGNAgizits1jHBYqK4gkKAQrXTdDbPAoAQtdM0IsvSkDXJvQEMdMJMYsvShjXJiDXSsIBktdNkjBt4gIW7UTQ10nCAYqOgOIRDAH+cO1E0PQFjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE+GqNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT4a3EhgED0Do4kjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE3w0AJvhsgED0DvK91wv/+GJw+GNw+GYDfjD4Qm7jANHbPCOOKiXQ0wH6QDAxyM+HIM5xzwthXhFVIMjPkle/A2rOWcjOAcjOzc3NyXD7AJJfA+LjAH/4ZxEQDwA++Ez4S/hK+Eb4Q/hCyMv/yz/KAM5ZyM4ByM7NzcntVAAM+Er4S/hMAETtRNDT/9M/0gD6QNTR0PpA1NHQ+kDR+Gz4a/hq+Gb4Y/hiAgr0pCD0oRQTABRzb2wgMC40Ny4wAAAADCD4Ye0e2Q==",
    codeHash: "5ccf0d1cd0b7996ab164da1cf402990e6184efced3f6ba28924321b20b837023",
};
module.exports = { IndexContract };