import {describe, it, expect, test, assert} from "vitest";
import {_doesUsernameExist} from "../routes/loginPage/+page.server";
import {isRedirect} from "@sveltejs/kit";
import * as TestUtils from "./TestUtils";
import {actions} from "../routes/loginPage/+page.server";

describe("sum test", () => {
    it("adds 1 + 2 to equal 3", () => {
        expect(1 + 2).toBe(3);
    });
});

test("should return no errors if username exists in the database", async () => {
    try {
        await TestUtils.setUpTestEnv();
        await expect(
            _doesUsernameExist(await TestUtils.db, "goldenVoyager80")
        ).resolves.toBeUndefined();
        await TestUtils.cleanUpTest();
    } catch (error) {
        console.error("Error:", error);
        assert(false, "Error executing command to get database information");
    }
});

test("should throw an error if username does not exist in the database", async () => {
    await TestUtils.setUpTestEnv();
    try {
        await _doesUsernameExist(await TestUtils.db, "nonExistingUsername");
    } catch (error) {
        // @ts-ignore
        expect(error.message).toEqual(
            "Invalid Username or Password, Please try again"
        );
    }
});

test("Login function should handle event and return formData", async () => {
    // Create a mock event object for testing login function
    // @ts-ignore
    try {
        // @ts-ignore
        await actions.login(TestUtils.mockEventLogin);
    } catch (e) {
        assert(isRedirect(e));
    }
});
