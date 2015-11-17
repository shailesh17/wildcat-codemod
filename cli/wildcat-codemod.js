#! /usr/bin/env babel-node

import {echo, exit} from "shelljs";
import nomnom from "nomnom";
import fs from "fs";
import path from "path";
import {exec} from "child_process";

const {src, all} = nomnom.options({
    src: {
        abbr: "s",
        help: "Source directory to run the transforms against"
    },
    all: {
        flag: true,
        abbr: "A",
        help: "Run all transforms in transforms folder"
    },
    single: {
        help: "Run single transform",
        abbr: "o"
    }
}).parse();


if (!src) {
    echo("src option is required");
    exit(1);
}

if (all) {
    const transformBasePath = path.join(__dirname, "..", "transforms");
    const transforms = fs.readdirSync(transformBasePath);

    transforms.map(transform => {
        const transformFilePath = path.join(transformBasePath, transform);
        const cmd = `jscodeshift -t ${transformFilePath} ${src}`;
        exec(cmd, (err, stout) => {
            echo(stout);
        });
    });
}





