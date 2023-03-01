const imageForm: HTMLFormElement | null = document.querySelector('#imageForm');
const resultPreview: HTMLDivElement | null = document.querySelector('.images');
const feedbackMsg: HTMLDivElement | null = document.querySelector('#feedbackMsg');
const generateBtn: HTMLButtonElement | null = document.querySelector('#btn');

type Data = {
    data: [],
    status: boolean,
    message?: string
};

type ImageData = {
    url: string
};

const imageLi = (image: string): string => {
    return `
        <li>
            <a target="_blank" href="${image}">
                <img src="${image}" alt="${image}">
            </a>
        </li>
    `
}

imageForm?.addEventListener('submit', async function (e: Event): Promise<void> {
    e.preventDefault();
    generateBtn?.setAttribute('disabled', 'true');
    generateBtn!.innerText = 'Loading....'

    const imageName: HTMLInputElement | null = this.querySelector('[name="name"]');
    const imageNumber: HTMLSelectElement | null = this.querySelector('[name="number"]');
    
    try {
        const data: object = {
            imageName: imageName!.value,
            imageNumber:  imageNumber!.value
        }

        const request: Response = await fetch('/generate-image', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            }
        });

        const response: Data = await request.json();
        if(response?.status){
            resultPreview!.innerHTML = `${response.data.map((image: ImageData) => imageLi(image.url)).join('')}`;
            generateBtn?.removeAttribute('disabled');
            generateBtn!.innerText = 'Generate';
        }else{
            feedbackMsg!.innerHTML = `<span style="color: red">${response?.message}</span>`
            generateBtn?.removeAttribute('disabled');
            generateBtn!.innerText = 'Generate';
        }
        
    } catch (error) {
        console.log(error);
        
    }
    
});
