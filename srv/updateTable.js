const cds = require("@sap/cds");

const { Students } = cds.entities("myCompany.hr.lms");

module.exports = (srv) => {
    srv.on("CREATE", "updateStudent", async (req, res) => {
        let firstName = req.data.first_name;
        let searchEmail = req.data.email;

        //without transaction
        let result = await UPDATE(Students)
            .set({
                first_name: firstName
            }).where({
                email: searchEmail
            });
        
        return req.data;
    });

    srv.on("CREATE", "updateStudentWithTransaction", async (req, res) => {
        let firstName = req.data.first_name;
        let searchEmail = req.data.email;

        let returnData = await cds.transaction(req)
            .run(
                UPDATE(Students)
                    .set({
                        first_name: firstName
                    })
                    .where({
                        email: searchEmail
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
                req.error(500, "Records not updated!");
            });
            return returnData;
    });
}