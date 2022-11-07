import '../../assets/styles/fonts.css'
import '../../assets/styles/normalize.css'
import '../../assets/styles/body.css'
import './main_header.css'
import './main_main.css'
import './main_footer.css'

import { burgerOpen, openBurger, closeBurger } from '../../assets/js/burger'

burgerOpen.onclick = openBurger;
document.onclick = closeBurger;