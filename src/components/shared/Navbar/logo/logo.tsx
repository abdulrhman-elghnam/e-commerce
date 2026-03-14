import Image from 'next/image';
import logo from  "@/assets/images/freshcart-logo.svg"

const Logo = () => {
    return (
        <>
            <Image src={logo} alt="logo" width={100} height={100} />
        </>
    );
}

export default Logo;
