'use server'
import { signIn, signOut } from "@/auth/auth";

export async function doLogout() {
    await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: { email: string, password: string }) {

    try {
        const response = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });


        return response;
    } catch (err) {

        throw err;
    }
}
