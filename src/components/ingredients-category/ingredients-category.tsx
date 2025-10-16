import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';
import { selectBuilderItems } from '../../services/slices/constructorSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>((props, ref) => {
  const { title, titleRef, ingredients, ...rest } = props;
  const builderState = useSelector(selectBuilderItems);

  const ingredientCountMap = useMemo(() => {
    const currentBread =
      builderState && builderState.bun ? builderState.bun : null;
    const fillings =
      builderState && builderState.fillings ? builderState.fillings : [];

    const counts = fillings.reduce<Record<string, number>>(
      (acc, item: TIngredient) => {
        acc[item._id] = (acc[item._id] || 0) + 1;
        return acc;
      },
      {}
    );

    if (currentBread) {
      counts[currentBread._id] = 2;
    }

    return counts;
  }, [builderState]);

  return (
    <IngredientsCategoryUI
      ref={ref}
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientCountMap}
      {...rest}
    />
  );
});
