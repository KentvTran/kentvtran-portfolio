import{createClient} from "$lib/prismicio";

export const prerender = 'auto'; //comment out?
//prismic tutorial imports for contact form
// import { fail } from '@sveltejs/kit';
// import { dev } from '$app/environment';

export async function load(){
    const client = createClient()
    
    const settings = await client.getSingle('settings');

    return {
        settings
    };
}

//prismic tutorial code for contact form
// export const actions = {
//   default: async ({ request, fetch }) => {
//     // Access the form data
//     const data = await request.formData();
//     // Retrieve the user's email
//     const email = data.get("email");
//     // Retrieve the user's message
//     const message = data.get("message");

//     // Send the email and message to an external API
//     // Update this endpoint to send the data wherever you want
//     const response = await fetch("https://monkey-elephant.free.beeceptor.com", {
//       method: "post",
//       body: JSON.stringify({
//         email,
//         message,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     // Simulate a 1s loading time in development
//     if (dev) {
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//     }

//     // Return an error if the API request is not successful
//     if (response.status !== 200) {
//       return fail(500);
//     }

//     // Return a success message
//     return {
//       success: true,
//     };
//   },
// }
