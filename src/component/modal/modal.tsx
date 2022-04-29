import CoinModal from "./coin"
import SearchModal from "./search"
import SettingModal from "./setting"

export default function Modal() {
    return (
        <>
            <SearchModal></SearchModal>
            <CoinModal></CoinModal>
            <SettingModal></SettingModal>
        </>
    )
}
