// import { RunUpdatesRequestBody$inboundSchema } from "comfydeploy/models/webhooks";
// import { NextResponse } from "next/server";

// export async function POST(request ) {
//     const parseData = RunUpdatesRequestBody$inboundSchema.safeParse(
//       await request.json(),
//     );

//     if (!parseData.success) {
//       return NextResponse.json({ message: "error" }, { status: 400 });
//     }

//     const data = parseData.data;

//     const { status, runId, outputs } = data;

//     // Do your things
//     console.log(status, runId, outputs);

//     // save in a txt file local with runId name
//     // your file content here
//     const content = Date.now().toString();
//     writeFileSync(`/tmp/${runId}.json`, outputs);
    

//     // Return success to ComfyDeploy
//     return NextResponse.json({ message: "success", data: outputs }, { status: 200 });
// }


