import { ingredientIcons } from "../lib/ingredients";

function Ingredients({ ingredients }: { ingredients: string | undefined }) {
  const allIngredients = ingredients?.split(",") ?? [];

  return (
    <div className="flex text-amber-300 mb-2.5 flex-wrap">
      {allIngredients.map((ingredient) => {
        ingredient = ingredient.toLocaleLowerCase();
        const Icon = ingredientIcons[ingredient];

        if (Icon) {
          const RenderIcon =
            typeof Icon === "string" ? <img src={Icon} alt="" width={19} height={19} className="bg-amber-400 rounded-full"/> : <Icon />;
          return (
            <div key={ingredient} className="max-w-fit mr-2.5 flex align-middle mt-1.5">
              {RenderIcon}
              <span className="text-xs ml-1.5">{ingredient}</span>
            </div>
          );
        }

        return (
          <div key={ingredient} className="max-w-fit mr-2.5">
            {ingredient}
          </div>
        );
      })}
    </div>
  );
}

export default Ingredients;
