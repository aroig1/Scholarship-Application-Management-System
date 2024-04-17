import {describe, it, expect, test, assert} from "vitest";
import {
    _normalizePhoneNumber,
    _validateInput,
    _getUserTypeFromValue,
    _checkUsers
} from "../routes/createAccount/+page.server";
import {generateId} from "lucia";
import {isRedirect} from "@sveltejs/kit";
import * as TestUtils from "./TestUtils";
var password_array = require("./JSON_files/TestPasswords.json");
import {actions} from "../routes/createAccount/+page.server";
import {UserType} from "$lib/types";

//@ts-ignore
function getWord(word) {
    if (word === "0") {
        return UserType.Applicant;
    } else if (word === "1") {
        return UserType.Administrator;
    } else {
        return UserType.Donor;
    }
}

describe("sum test", () => {
    it("adds 1 + 2 to equal 3", () => {
        expect(1 + 2).toBe(3);
    });
});

describe("phone number tests", () => {
    it("test_1", () => {
        expect(_normalizePhoneNumber("(520)-345-7845")).toBe("(520)-345-7845");
    });
    it("test_2", () => {
        expect(_normalizePhoneNumber("1234567890")).toBe("(123)-456-7890");
    });
    it("test_3", () => {
        expect(_normalizePhoneNumber("5203457845")).toBe("(520)-345-7845");
    });
    it("test_4", () => {
        expect(_normalizePhoneNumber("0000000000")).toBe("(000)-000-0000");
    });
    it("test_5", () => {
        expect(_normalizePhoneNumber("1122334455")).toBe("(112)-233-4455");
    });

    //Bad phone number manage to get through returns bad phone number.
    it("test_6", () => {
        expect(_normalizePhoneNumber("(520)--345-/7845")).toBe(
            "(520)--345-/7845"
        );
    });
});

describe("_validateInput Function all tests should Pass", () => {
    for (let i = 0; i < 10; i++) {
        const user = {
            id: generateId(15),
            username: TestUtils.users_array[i].username,
            password: {
                hash: TestUtils.users_array[i].password,
                salt: TestUtils.users_array[i].salt
            },
            firstName: TestUtils.users_array[i].firstName,
            lastName: TestUtils.users_array[i].lastName,
            phone: TestUtils.users_array[i].phone,
            email: TestUtils.users_array[i].email,
            type: getWord(TestUtils.users_array[i].type)
        };

        it("test_" + i, () => {
            expect(_validateInput(user, password_array[i].password)).toBe(null);
        });
    }
});

describe("_validateInput Function all tests should return an error", () => {
    const badUserName = {
        id: generateId(15),
        username: "",
        password: {
            hash: TestUtils.users_array[1].password,
            salt: TestUtils.users_array[1].salt
        },
        firstName: TestUtils.users_array[1].firstName,
        lastName: TestUtils.users_array[1].lastName,
        phone: TestUtils.users_array[1].phone,
        email: TestUtils.users_array[1].email,
        type: getWord(TestUtils.users_array[1].type)
    };

    const badFirstName = {
        id: generateId(15),
        username: TestUtils.users_array[1].username,
        password: {
            hash: TestUtils.users_array[1].password,
            salt: TestUtils.users_array[1].salt
        },
        firstName: "",
        lastName: TestUtils.users_array[1].lastName,
        phone: TestUtils.users_array[1].phone,
        email: TestUtils.users_array[1].email,
        type: getWord(TestUtils.users_array[1].type)
    };

    const badLastName = {
        id: generateId(15),
        username: TestUtils.users_array[1].username,
        password: {
            hash: TestUtils.users_array[1].password,
            salt: TestUtils.users_array[1].salt
        },
        firstName: TestUtils.users_array[1].firstName,
        lastName: "",
        phone: TestUtils.users_array[1].phone,
        email: TestUtils.users_array[1].email,
        type: getWord(TestUtils.users_array[1].type)
    };

    const badEmail = {
        id: generateId(15),
        username: TestUtils.users_array[1].username,
        password: {
            hash: TestUtils.users_array[1].password,
            salt: TestUtils.users_array[1].salt
        },
        firstName: TestUtils.users_array[1].firstName,
        lastName: TestUtils.users_array[1].lastName,
        phone: TestUtils.users_array[1].phone,
        email: "ava.neonSpectre21gmail.com",
        type: getWord(TestUtils.users_array[1].type)
    };

    const badPhone = {
        id: generateId(15),
        username: TestUtils.users_array[1].username,
        password: {
            hash: TestUtils.users_array[1].password,
            salt: TestUtils.users_array[1].salt
        },
        firstName: TestUtils.users_array[1].firstName,
        lastName: TestUtils.users_array[1].lastName,
        phone: "",
        email: TestUtils.users_array[1].email,
        type: getWord(TestUtils.users_array[1].type)
    };

    const userValid = {
        id: generateId(15),
        username: TestUtils.users_array[1].username,
        password: {
            hash: TestUtils.users_array[1].password,
            salt: TestUtils.users_array[1].salt
        },
        firstName: TestUtils.users_array[1].firstName,
        lastName: TestUtils.users_array[1].lastName,
        phone: TestUtils.users_array[1].phone,
        email: TestUtils.users_array[1].email,
        type: getWord(TestUtils.users_array[1].type)
    };

    it("Invalid UserName less than 3 chars", () => {
        badUserName.username = "dd";
        try {
            _validateInput(badUserName, password_array[1].password);
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid username");
        }
    });
    it("Invalid UserName greater than 31 chars", () => {
        badUserName.username = "asdfghjklzxcvbnmqwertyuiopasdfghjklmnbvc";
        try {
            _validateInput(badUserName, password_array[1].password);
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid username");
        }
    });

    //testing passwords ///////////////////////////////////////////////////
    it("Invalid Password less than 6 chars", () => {
        try {
            _validateInput(userValid, "asd");
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid password");
        }
    });
    it("Invalid Password no special char", () => {
        try {
            _validateInput(userValid, "aaaAA123");
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid password");
        }
    });
    it("Invalid Password no number", () => {
        try {
            _validateInput(userValid, "aaaaAA!#");
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid password");
        }
    });
    it("Invalid Password no CAPS char", () => {
        try {
            _validateInput(userValid, "aa123!#");
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid password");
        }
    });
    it("Invalid Password no lowercase char", () => {
        try {
            _validateInput(userValid, "AASS1345!");
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid password");
        }
    });
    it("Invalid Password greater than 255 chars", () => {
        try {
            _validateInput(
                userValid,
                "kjdkjdfkdfjkfdjfdkjnmjhytgftrwAAAAAAAAAA!!!!!!!!!!7586758675aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            );
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid password");
        }
    });
    //////////////////////////////////////////////////////////////////////////

    it("Invalid First Name no first name entered", () => {
        try {
            _validateInput(badFirstName, password_array[1].password);
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid first name");
        }
    });
    it("Invalid First Name contains num", () => {
        badFirstName.firstName = "asdfghjkl4424242";
        try {
            _validateInput(badFirstName, password_array[1].password);
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid first name");
        }
    });

    it("Invalid Last Name no last name entered", () => {
        try {
            _validateInput(badLastName, password_array[1].password);
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid last name");
        }
    });
    it("Invalid Last Name contains num", () => {
        badLastName.lastName = "asdfghjkl444222442";
        try {
            _validateInput(badLastName, password_array[1].password);
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid last name");
        }
    });

    it("Invalid Email", () => {
        try {
            _validateInput(badEmail, password_array[1].password);
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain("Invalid email");
        }
    });

    it("Invalid phone less than 10", () => {
        badEmail.phone = "123456789";
        try {
            _validateInput(badPhone, password_array[1].password);
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain(
                "Phone number must have at least 10 digits"
            );
        }
    });

    it("Invalid phone greater than 10", () => {
        badEmail.phone = "123456789011";
        try {
            _validateInput(badPhone, password_array[1].password);
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain(
                "Phone number must have at least 10 digits"
            );
        }
    });
});

describe("_checkUsers", () => {
    it("Username already exists", async () => {
        try {
            await TestUtils.setUpTestEnv();
            await _checkUsers(
                await TestUtils.db,
                TestUtils.users_array[1].username
            );
        } catch (e) {
            //@ts-ignore
            expect(e.message).toContain(
                "Username already taken. Please make a new username"
            );
        } finally {
            await TestUtils.cleanUpTest();
        }
    });

    it("Username does not exist", async () => {
        await TestUtils.setUpTestEnv();
        try {
            const result = await _checkUsers(
                await TestUtils.db,
                "NEW_USER_NAME"
            );
            expect(result).toBe(true);
        } finally {
            await TestUtils.cleanUpTest();
        }
    });
});

describe("_getUserTypeFromValue", () => {
    it("should return UserType.Applicant for value 0", () => {
        const userType = _getUserTypeFromValue(0);
        expect(userType).toBe(UserType.Applicant);
    });

    it("should return UserType.Administrator for value 1", () => {
        const userType = _getUserTypeFromValue(1);
        expect(userType).toBe(UserType.Administrator);
    });

    it("should return UserType.Donor for value 2", () => {
        const userType = _getUserTypeFromValue(2);
        expect(userType).toBe(UserType.Donor);
    });

    it("should return undefined for invalid value", () => {
        const userType = _getUserTypeFromValue(3); // Using an invalid value
        expect(userType).toBeUndefined();
    });
});

test("Login function should handle event and return formData", async () => {
    // @ts-ignore
    try {
        await TestUtils.setUpTestEnv();
        // @ts-ignore
        await actions.default(TestUtils.mockEventCreateAccount);
    } catch (e) {
        assert(isRedirect(e));
    } finally {
        await TestUtils.cleanUpTest();
    }
});
