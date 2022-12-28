import {ThreeEvent} from '@react-three/fiber';
import {VIAKey} from '@the-via/reader';
import {useCallback, useMemo, useState} from 'react';
import {useAppSelector} from 'src/store/hooks';
import {getSelectedTheme} from 'src/store/settingsSlice';
import {getHSV} from './color-math';

export const useColorPainter = (
  keys: VIAKey[],
  selectedPaletteColor: [number, number],
) => {
  const theme = useAppSelector(getSelectedTheme);
  const colorOpts = useMemo(
    () => Object.values(theme).map((theme) => theme.c),
    [theme],
  );
  const [keyColors, setKeyColors] = useState(
    keys.map(() => {
      const [h, s] = getHSV(colorOpts[0]);
      return [h, s];
    }),
  );

  const onKeycapPointerDown = useCallback(
    (evt: ThreeEvent<MouseEvent>, idx: number) => {
      if (evt.buttons === 1) {
        setKeyColors((colors) => {
          console.log(colorOpts);
          colors[idx] = selectedPaletteColor;
          return [...colors];
        });
      }
    },
    [setKeyColors, selectedPaletteColor],
  );
  const onKeycapPointerOver = useCallback(
    (evt: ThreeEvent<MouseEvent>, idx: number) => {
      if (evt.buttons === 1) {
        debugger;
        setKeyColors((colors) => {
          console.log(colorOpts);
          colors[idx] = selectedPaletteColor;
          return [...colors];
        });
      } else if (evt.buttons === 4) {
        setKeyColors((colors) => {
          colors[idx] = selectedPaletteColor;
          return [...colors];
        });
      }
    },
    [setKeyColors, selectedPaletteColor],
  );

  return {keyColors, onKeycapPointerDown, onKeycapPointerOver};
};
