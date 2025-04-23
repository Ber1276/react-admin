import { create } from 'zustand';
import storage from '../utils/storage';
import { IUserItem } from '../types/api';
export const useStore = create<{
    token: string;
    userInfo: IUserItem;
    collapsed: boolean;
    isDark: boolean;
    updateToken: (token: string) => void;
    updateUserInfo: (userInfo: IUserItem) => void;
    updateCollapsed: () => void;
    updateTheme: (isDark: boolean) => void;
}>((set) => ({
    token: '',
    userInfo: {
        _id: '',
        userId: 0,
        userName: '',
        userEmail: '',
        deptId: '',
        state: 0,
        mobile: '',
        job: '',
        role: 0,
        roleList: '',
        createId: 0,
        deptName: '',
        userImg: '',
    },
    collapsed: false,
    isDark: storage.get('isDark') === 'true' ? true : false,
    updateToken: (token) => set({ token }),
    updateTheme: (isDark) => set({ isDark }),
    updateUserInfo: (userInfo: IUserItem) => set({ userInfo }),
    updateCollapsed: () =>
        set((state) => {
            return {
                collapsed: !state.collapsed,
            };
        }),
}));
