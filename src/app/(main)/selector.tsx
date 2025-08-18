import Link from 'next/link';

type Props = { selected: string }

export function LanguageSelector({ selected }: Props) {
  const options = [
    { key: 'all', label: 'All' },
    { key: 'en', label: 'EN' },
    { key: 'fr', label: 'FR' },
  ];
  return (
    <div className='join join-horizontal gap-2'>
      {options.map(option => (
        <Link
          key={option.key}
          className={`btn btn-sm ${selected === option.key ? 'btn-primary' : ''}`}
          href={option.key === 'all' ? '?' : `?lang=${option.key}`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}


