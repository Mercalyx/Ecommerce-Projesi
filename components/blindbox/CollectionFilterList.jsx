import CollectionFilterItem from "./CollectionFilterItem";

function CollectionFilterList({ options, active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {options.map((option) => (
        <CollectionFilterItem key={option} label={option} isActive={option === active} onClick={() => onSelect(option)} />
      ))}
    </div>
  );
}

export default CollectionFilterList;
