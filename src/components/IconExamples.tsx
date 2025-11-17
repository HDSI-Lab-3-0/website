import { Icon } from './Icon';

export const IconExamples = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Icon Examples</h2>
      
      <div className="flex items-center space-x-4">
        <h3 className="text-lg font-semibold">Different Sizes:</h3>
        <Icon icon="Home" size={16} />
        <Icon icon="Home" size={24} />
        <Icon icon="Home" size={32} />
      </div>

      <div className="flex items-center space-x-4">
        <h3 className="text-lg font-semibold">With Custom Classes:</h3>
        <Icon icon="Star" className="text-yellow-500" />
        <Icon icon="Heart" className="text-red-500" />
        <Icon icon="Check" className="text-green-500" />
      </div>

      <div className="flex items-center space-x-4">
        <h3 className="text-lg font-semibold">Different Stroke Widths:</h3>
        <Icon icon="Settings" strokeWidth={1} />
        <Icon icon="Settings" strokeWidth={2} />
        <Icon icon="Settings" strokeWidth={3} />
      </div>

      <div className="flex items-center space-x-4">
        <h3 className="text-lg font-semibold">Common UI Icons:</h3>
        <Icon icon="Search" />
        <Icon icon="Menu" />
        <Icon icon="X" />
        <Icon icon="Plus" />
        <Icon icon="Minus" />
        <Icon icon="ChevronRight" />
      </div>
    </div>
  );
};