import { useEffect } from "react";
import type { FC } from 'react';

import { WS_BASE_URL } from "../../../constants/api";
import { getCookie } from "../../../services/api/cookie";
import { useAppDispatch } from "../../../hooks";
import { startSocket } from "../../../services/store/slices/api/feed-socket-api";

const ProfileOrderHistory: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        dispatch(startSocket(`${WS_BASE_URL}?token=${accessToken}`));
    }, [dispatch]);

    return (
        <>

        </>
    );
};

export default ProfileOrderHistory;
