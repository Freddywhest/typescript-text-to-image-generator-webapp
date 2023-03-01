"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const imageForm = document.querySelector('#imageForm');
const resultPreview = document.querySelector('.images');
const feedbackMsg = document.querySelector('#feedbackMsg');
const generateBtn = document.querySelector('#btn');
const imageLi = (image) => {
    return `
        <li>
            <a target="_blank" href="${image}">
                <img src="${image}" alt="${image}">
            </a>
        </li>
    `;
};
imageForm === null || imageForm === void 0 ? void 0 : imageForm.addEventListener('submit', function (e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        generateBtn === null || generateBtn === void 0 ? void 0 : generateBtn.setAttribute('disabled', 'true');
        generateBtn.innerText = 'Loading....';
        const imageName = this.querySelector('[name="name"]');
        const imageNumber = this.querySelector('[name="number"]');
        try {
            const data = {
                imageName: imageName.value,
                imageNumber: imageNumber.value
            };
            const request = yield fetch('/generate-image', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                }
            });
            const response = yield request.json();
            if (response === null || response === void 0 ? void 0 : response.status) {
                resultPreview.innerHTML = `${response.data.map((image) => imageLi(image.url)).join('')}`;
                generateBtn === null || generateBtn === void 0 ? void 0 : generateBtn.removeAttribute('disabled');
                generateBtn.innerText = 'Generate';
            }
            else {
                feedbackMsg.innerHTML = `<span style="color: red">${response === null || response === void 0 ? void 0 : response.message}</span>`;
                generateBtn === null || generateBtn === void 0 ? void 0 : generateBtn.removeAttribute('disabled');
                generateBtn.innerText = 'Generate';
            }
        }
        catch (error) {
            console.log(error);
        }
    });
});
//# sourceMappingURL=script.js.map