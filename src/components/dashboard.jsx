import React from 'react';
import { Trans } from 'react-i18next';
import { TabsGroup} from './tabs';

export const Dashboard = (props) => {

    return (
        <div>
            <h1>
                <Trans i18nKey="title"> Manage Campaign </Trans>
            </h1>
            <TabsGroup />
        </div>
    )
}