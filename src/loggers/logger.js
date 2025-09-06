import { createStream } from "rotating-file-stream";
import morgan from "morgan";
import config from "config";

const stream = config.get("morgan.stream");
const streamAuth = config.get("morgan.stream_auth");
const morganType = config.get("morgan.type");

export const logger = morgan(morganType, {
    stream: getStream(stream),
    skip: (req, res) => res.statusCode == 401 || res.statusCode == 403
});
export const loggerAuth = morgan(morganType, {
    stream: getStream(streamAuth),
    skip: (req, res) => res.statusCode != 401 && res.statusCode != 403
});

function getStream(stream) {
    const pad = num => (num > 9 ? "" : "0") + num;
    const fileNameGenerator = (time, index) => {
        let res = stream;
        if (time) {
            const month = time.getFullYear() + "" + pad(time.getMonth() + 1);
            const day = pad(time.getDate());
            res = `${month}${day}-${index}-${stream}`;
        }
        return res;
    };
    return stream == "console" ? process.stdout : createStream(fileNameGenerator, config.get("morgan.rotation"));
}


