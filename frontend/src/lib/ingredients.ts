import { PiCheeseBold } from "react-icons/pi";
import { CiBacon } from "react-icons/ci";
import { PiPepper } from "react-icons/pi";
import { CiFries } from "react-icons/ci";
import { TbBrandCakephp } from "react-icons/tb";
import { LuEggFried } from "react-icons/lu";

import beef from "../assets/icons/beef_patty.svg";
import chicken from "../assets/icons/chicken_patty.svg";
import type { IconType } from "react-icons/lib";
import { LuVegan } from "react-icons/lu";

export const ingredientIcons: Record<string, IconType | string> = {
  cheese: PiCheeseBold,
  eggs: LuEggFried,
  jalapeño: PiPepper,
  bacon: CiBacon,
  chicken: chicken,
  beef: beef,
  veggie: LuVegan,
  chips: CiFries,
  cake: TbBrandCakephp,
};
// TODO: add cake category add description for chicken burger, change some images
