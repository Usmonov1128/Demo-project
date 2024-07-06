import moment from "moment"
export default {
    ifequal(a, b, options) {
        if (a == b) {
            return options.fn(this)
        }


        return options.inverse(this)
    },
    getFullNameFirsCharacter(firstName, lastNmae) {
        return firstName.charAt(0) + lastNmae.charAt(0)

    },
    formatDate(data){
        return moment(data).format("DD MMM, YYYY")
    }
}
