const { fork } = require("child_process")
const { worker_count } = require("./config")
let thread = worker_count//Thread Here
while (thread--) {
    fork("./worker")
}