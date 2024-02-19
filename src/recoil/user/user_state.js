import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

//recoil state 생성
export const userPicture = atom({
    key: 'picture',
    default: "",
    effects_UNSTABLE: [persistAtom],
}
);