module.exports = function(srv) {
    srv.on("myDemoSrv", (req, res) => {
        console.log("This message will be run in terminal not in browser!!!");
        let name = req.data.msg
        return "Hello " + name;
    })
}