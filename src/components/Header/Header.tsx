import {TonConnectButton} from "@tonconnect/ui-react";
import './header.scss';

export const Header = () => {
    return <header>
        <span>Пройдите авторизацию</span>
        <TonConnectButton />
    </header>
}
