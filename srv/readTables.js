const cds = require("@sap/cds");

const { Students } = cds.entities("myCompany.hr.lms");

module.exports = (srv) => {
    srv.on("READ", "StudentDB", async (req, res) => {
        const result = await SELECT.from(Students);
        return result;
    });

    //srv.after() is only used to modify data.
    //Neither you can create new or delete it.
    //It will always retuurn same number of rows (max rows) & columns (max columns) 
    srv.after("READ", "StudentDB", data => {
        let newValue = data.map( value => {
            value.first_name = value.first_name+" "+value.last_name;
            return value;
        });
        return newValue;
    });

    srv.on("READ", "StudentDbUseWhereClause", async (req, res) => {
        const result = await SELECT.from(Students).where({email: "mosh@demo.com"});
        return result;
    });

    //http://localhost:4004/odata/v4/read-tables/StudentDbUseWhereClauseFromURL(email='mosh@demo.com', first_name='Mosh')
    srv.on("READ", "StudentDbUseWhereClauseFromURL", async (req, res) => {
        const serachEmail = req.data.email;
        const firstName = req.data.first_name;
        const result = await SELECT.from(Students).where({email: serachEmail, first_name: firstName});
        return result;
    });

    srv.on("READ", "StudentDbUsingLimit", async (req, res) => {
        const result = await SELECT.from(Students).limit(2);
        return result;
    });
    
    srv.on("READ", "StudentDbUseWhereFirstNameJohn", async (req, res) => {
        let tempResult = await SELECT.from(Students);
        return tempResult.filter(row => row.first_name === "John");
    });
}