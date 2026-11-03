import { StatusBlockItems, StatusBlock as StatusBlockProps } from '@/lib/optimizely/types/generated'
import { castContent, SafeContent } from '@/lib/optimizely/types/typeUtils';

export default function StatusBlock({
  statusItems
}: StatusBlockProps) {
    return (
        <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex min-h-[120px] w-screen items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#050917] via-black to-[#0b1745] px-4 text-white lg:px-8">
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 text-left md:grid-cols-4">
          {statusItems?.map((stat, index) => {
            const safeItem = stat ? { ...stat, __typename: 'StatusBlockItems' } : null;
            const statItem = castContent<StatusBlockItems>(safeItem as SafeContent,'StatusBlockItems');
              console.log('StatusBlockProps:', { statItem });
            return (
            <div key={index} className="p-3">
              <div className={`text-2xl font-bold md:text-3xl ${statItem?.accent ? 'text-sky-300' : 'text-white'}`}>
                {statItem?.value}
              </div>
              <div className="text-xs text-gray-400" >{statItem?.label}</div>
            </div>
            )
          })}
        </div>
    </section>
  );
}
 