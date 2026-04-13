'use client';

import { AlertCircle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-amber-600" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">A Note of Care</h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              Heart&apos;s Companion is designed to be a gentle, supportive space for reflection and remembrance. 
              It is not a substitute for professional mental health counseling or medical advice. 
              If you or someone you love is struggling deeply with grief, please reach out to a trusted 
              professional, a pastor, or a support group. You do not have to carry this burden alone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
