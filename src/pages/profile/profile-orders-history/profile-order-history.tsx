import type { FC } from 'react';

import FeedOrderList from "../../../components/feed/feed-main/feed-order-list/feed-order-list";

const ProfileOrderHistory: FC = () => {

    return (
        <div style={{ marginTop: "44px" }}>
            <FeedOrderList />
        </div>
    );
};

export default ProfileOrderHistory;
