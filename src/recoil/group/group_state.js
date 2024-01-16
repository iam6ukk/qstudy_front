import { atom } from 'recoil';

//recoil state 생성
export const groupInfoState = atom({
    key: 'groupInfo',
    default: [
        {
            title: "C언어 우웩",
            contents: "스터디를 참가할 인원을 모집합니다",
            wrtier: "김민수"
        },
        {
            title: "세상안녕 언제까지해",
            contents: "스터디를 참가할 인원을 모집합니다",
            wrtier: "너구리"
        },
        {
            title: "코딩 싫어요",
            contents: "스터디를 참가할 인원을 모집합니다",
            wrtier: "박두팔"
        }
    ]
});