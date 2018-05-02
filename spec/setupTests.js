import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import i18n from 'nexshop-web-i18n';

i18n.init({fallbackLng: false});
configure({ adapter: new Adapter() });

