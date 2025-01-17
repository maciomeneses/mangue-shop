var fs = require("fs");

export class DBService {
    name: string;
    path: string;
    data: any;

    constructor(name: string) {
        this.name = name;
        // __dirname is created in relation to folder "typeScript"
        this.path = __dirname + '/../../database/files/' + name + '.json';
        this.read();
    }

    getIdCount() {
        var count = 0;
        for(let i of this.data[this.name]) {
            count = count + 1;
        }
        return count;
    }

    read() {
        this.data = JSON.parse(
            fs.readFileSync(this.path, "utf8", (err: any) => {
                if (err) throw err;
            })
        );
    }

    write() {
        fs.writeFileSync(this.path, JSON.stringify(this.data), (err: any) => {
            if (err) throw err;
        });
    }

    getData() {
        return this.data[this.name];
    }

    add(data: any) {
        this.data[this.name].push(data);
        this.write();
    }

    delete(index: any) {
        this.data[this.name].splice(index, 1);
        this.write();
    }

    update(index: any, item: any) {
        this.data[this.name].splice(index, 1, item);
        this.write();
    }
}

exports.DBService = DBService;