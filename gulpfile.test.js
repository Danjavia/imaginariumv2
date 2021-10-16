const rewire = require("rewire")
const gulpfile = rewire("./gulpfile")
const bundle = gulpfile.__get__("bundle")
// @ponicode
describe("bundle", () => {
    test("0", () => {
        let callFunction = () => {
            bundle()
        }
    
        expect(callFunction).not.toThrow()
    })
})
