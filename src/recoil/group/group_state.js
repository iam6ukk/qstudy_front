import { atom } from 'recoil';

//recoil state 생성
export const groupInfoState = atom({
    key: 'groupInfo',
    default: [
       
    ]
});

export const groupMinusState = atom({
    key: 'groupMinus',
    default: 0
})