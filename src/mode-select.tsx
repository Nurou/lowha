import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from './@/components/ui/select';
import { ModeKey, Modes } from './constants';

export const ModeSelect = ({
  modes,
  defaultMode,
  changeMode,
}: {
  modes: Modes;
  defaultMode: ModeKey;
  changeMode: React.Dispatch<React.SetStateAction<ModeKey>>;
}) => {
  return (
    <Select defaultValue={defaultMode} onValueChange={(mode) => changeMode(mode as ModeKey)}>
      <SelectTrigger className='text-2xl p-6 text-stone-200 bg-stone-700'>
        <SelectValue className='text-2xl ' placeholder='Select a mode' />
      </SelectTrigger>
      <SelectContent className='text-2xl text-stone-200 bg-stone-700'>
        <SelectGroup>
          <SelectLabel className='text-2xl'>Modes</SelectLabel>
          {Object.entries(modes).map(([key, value]) => (
            <SelectItem className='text-2xl' key={key} value={key}>
              {value?.displayName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
