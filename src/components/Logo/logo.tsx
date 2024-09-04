import { LogoContainer } from './logo.style';
import LogoCosmos from '../../assets/LogoCosmos.svg';

const Logo = () => {
  return (
    <LogoContainer>
      <img src={LogoCosmos} alt="Cosmos" />
    </LogoContainer>
  );
};

export default Logo;
