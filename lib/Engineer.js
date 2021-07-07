const Employee = require("./Employee")

class Engineer extends Employee {
    constructor (name, id, email, gitHubUsername) {
        super(name, id, email);
        this.gitHubUsername = gitHubUsername;
    }

    getRole(){
        return "Engineer"
    }
    
    getgitHubUsername(){
        return this.gitHubUsername
    }
}

module.exports = Engineer

