'use client';

import { useEffect, useState } from 'react';
import { getDomains } from '../domain-aggregator/requests';
import Select from 'react-select';
import { customSelect } from '../../../components/UI/CustomSelect';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaCirclePlus } from 'react-icons/fa6';
import DynamicItem from '../../../components/url-builder/DynamicItem';
import { FaCopy } from 'react-icons/fa6';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import WrapperUrl from '../../../components/url-builder/WrapperUrl'

export default function UrlBuilderPage() {
  const [domains, setDomains] = useState();
  const [activeDomain, setActiveDomain] = useState();
  const [creativeHeadline, setCreativeHeadline] = useState();
  const [showDynamic, setShowDynamic] = useState(false);
  const [dynamicInput, setDynamicInput] = useState('');
  const [dynamic, setDynamic] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDomains();
      setDomains(response);
    };
    fetchData();
  }, []);

  const GENERATED_URL = `http://${activeDomain ? activeDomain : 'your-domain'}?ref_adnetwork=meta&ref_pubsite=meta&ref_keyword=${creativeHeadline ? creativeHeadline : 'missing'}${dynamic.length > 0 ? '&terms=' + dynamic.join(',') : ''}`;
  const domainsOptions = domains?.map((domain) => {
    return {
      value: domain.Name,
      label: domain.Name,
    };
  });

  const submitAdding = () => {
    if (dynamicInput !== '') {
      const input = dynamicInput;
      setDynamicInput('');
      setDynamic((prev) => [...prev, input]);
    }
  };

  const removeDynamic = (el) => {
    const arr = [...dynamic];
    arr.splice(el, 1);
    setDynamic(arr);
  };

  const updateDynamic = (upd, index) => {
    const arr = [...dynamic];
    arr[index] = upd;
    setDynamic(arr);
  };

  return (
    <section className="w-2/3 h-full py-10 max-sm:w-[95vw]">
      <form className="flex flex-col gap-4 w-full">
        <Select
          id="domain-select"
          placeholder="Your domain"
          noOptionsMessage={() => 'Loading...'}
          options={domainsOptions}
          styles={customSelect}
          onChange={(event) => setActiveDomain(event.value)}
        />
        <h3 className="text-gray-600 text-sm mb-[-10px]">Traffic Source</h3>
        <div className="bg-[#131a22] p-2 rounded-md">Meta</div>
        <h3 className="text-gray-600 text-sm mb-[-10px]">
          Creative Headline (Requried)
        </h3>

        <input
          value={creativeHeadline}
          onChange={(e) => setCreativeHeadline(e.target.value)}
          type="text"
          className="p-2 bg-[#131a22] rounded-md text-white"
          placeholder="Crative Headline*"
        />

        <h3 className="text-gray-600 text-sm mb-[-10px]">
          Additional Options:
        </h3>

        <div>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                onChange={() => setShowDynamic(!showDynamic)}
                sx={{ color: 'white' }}
              />
            }
            label="Dynamic Terms"
          />
        </div>

        {showDynamic && (
          <div className="bg-[#131a22] p-4 rounded-md w-full flex items-center gap-4 flex-wrap">
            {dynamic?.map((el, index) => (
              <DynamicItem
                key={el + index}
                item={el}
                onUpdate={(upd) => updateDynamic(upd, index)}
                onRemove={() => removeDynamic(index)}
              />
            ))}
            <div className="flex items-center gap-2 w-full">
              <input
                onChange={(e) => setDynamicInput(e.target.value)}
                value={dynamicInput}
                type="text"
                className="bg-transparent text-white border-2 rounded-md p-2"
                placeholder="Dynamic Terms"
              />
              <div
                className="text-purple-600 cursor-pointer text-[200%]"
                onClick={submitAdding}
              >
                <FaCirclePlus />
              </div>
            </div>
          </div>
        )}

        <h3 className="text-gray-600 text-sm mb-[-10px]">
          Your automatically generated URL
        </h3>
        <CopyToClipboard text={GENERATED_URL}>
          <div
            onClick={() => {
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 2000);
            }}
            className="w-full p-4 border-2 cursor-pointer hover:border-purple-600 border-gray-400 rounded-md flex items-center justify-between"
          >
            <div className='truncate'>{GENERATED_URL}</div>
            {isCopied ? (
              <div>Copied</div>
            ) : (
              <div className="text-[150%] hover:text-purple-600">
                <FaCopy />
              </div>
            )}
          </div>
        </CopyToClipboard>
        <h3 className="text-gray-600 text-sm mb-[-10px]">
          Wrapped url:
        </h3>
        <WrapperUrl url={GENERATED_URL}/>
      </form>
    </section>
  );
}
