import '../../assets/styles/fonts.css'
import '../../assets/styles/normalize.css'
import '../../assets/styles/body.css'
import '../../assets/styles/header.css'
import '../../assets/styles/footer.css'

import { burgerOpen, openBurger, closeBurger } from '../../assets/js/burger'

burgerOpen.onclick = openBurger;
document.onclick = closeBurger;