import axios from "axios";

const api = axios.create({
    baseURL: 'https://staging.api.dragonflyai.co/pipeline/assets',
});


export async function generateURL() {
    const API_KEY = 'fa66abff-98c2-4122-8997-b767836bf956'

    return (await api.post('/stage', {}, { headers: { "Authorization": API_KEY } })).data;
}


export type StageFileType = {
    url: string,
    headerAPIKey: string,
    imageData: string
}
export async function stageFile({ url, headerAPIKey, imageData }: StageFileType) {
    const api = axios.create({
        baseURL: url,
        headers: {
            'Authorization': headerAPIKey,
            "Content-Type": 'image/jpeg'
        },
    });
    return await api.put('/stage', { data: imageData });
}



export async function startProcessing({ headerAPIKey }: { headerAPIKey: string }) {
    return await api.post('/process', {}, { headers: { "Authorization": headerAPIKey, "Content-Type": 'application/x-www-form-urlencoded' } });
}






