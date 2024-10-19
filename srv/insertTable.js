const cds = require("@sap/cds");

const { Students } = cds.entities("myCompany.hr.lms");

module.exports = (srv) => {
    srv.on("CREATE", "insertStudent", async (req, res) => {
        let returnData = await cds.transaction(req)
            .run(
                INSERT.into(Students).entries({
                    email: req.data.email,
                    first_name: req.data.first_name,
                    last_name: req.data.last_name,
                    data_sign_up: req.data.data_sign_up
                })
            ).then( (resolve, reject) => {
                //resolve store number. Showing number of rows that are modified
                if (typeof resolve !== 'undefined') {
                    return req.data;
                }
                else{
                    req.error(409, "Records not inserted!");
                }
            })
            .catch( err => {
                console.log(err);
                req.error(500, "Records not found!");
            });
            return returnData;
    });
}