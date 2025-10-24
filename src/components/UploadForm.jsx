import React, { useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ChevronDown = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
    <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function Select({ label, required, value, onChange, children, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-zinc-800">{label}{required && <span className="text-red-500"> *</span>}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          required={required}
          className="w-full appearance-none rounded-xl border border-zinc-300 bg-white px-3 py-3 pr-10 text-[15px] shadow-sm outline-none transition
                     hover:border-zinc-400 focus:border-[#c8102e] focus:ring-4 focus:ring-[#c8102e]/15"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-zinc-500">
          <ChevronDown />
        </span>
      </div>
    </div>
  );
}

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          aria-label={`${n} star${n>1?'s':''}`}
          className="p-1"
        >
          <svg viewBox="0 0 24 24" className={`h-6 w-6 ${ (hover || value) >= n ? 'fill-amber-400' : 'fill-zinc-200'}`}>
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        </button>
      ))}
      <span className="ml-2 text-sm text-zinc-600">{value ? `${value}/5` : "Select rating"}</span>
    </div>
  );
}

function AmenityPill({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`rounded-full border px-3 py-1.5 text-sm transition shadow-sm
                 ${checked ? 'border-[#c8102e] bg-[#c8102e]/10 text-[#a00d24]' : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400'}`}
      aria-pressed={checked}
    >
      {label}
    </button>
  );
}

function FileUpload({ inputRef, preview, setPreview, required }) {
  const [fileName, setFileName] = useState("");

  const pick = () => inputRef.current?.click();

  const onFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      inputRef.current.files = e.dataTransfer.files;
      onFile(f);
    }
  };

  return (
    <div className="space-y-2">
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-center transition
                   hover:border-zinc-400"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="mx-auto h-40 w-auto rounded-lg object-cover" />
        ) : (
          <div className="text-sm text-zinc-600">
            Drag & drop a photo here
          </div>
        )}

        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={pick}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-black/90"
          >
            Choose Photo
          </button>
          <span className="text-xs text-zinc-500">{fileName || "JPG or PNG"}</span>
        </div>
      </div>

      <input
        type="file"
        ref={inputRef}
        accept=".jpg,.jpeg,.png"
        className="hidden"
        required={required}
        onChange={(e) => onFile(e.target.files?.[0])}
      />
    </div>
  );
}

const UploadForm = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    dorm_name: "",
    class_year: "",
    rating: 0,
    amenities: [],
    review: "",
    photo_url: "",
  });
  const fileInputRef = useRef();

  const toggleAmenity = (value) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(value);
      return { ...prev, amenities: exists ? prev.amenities.filter(a => a !== value) : [...prev.amenities, value] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.dorm_name || !formData.class_year || !formData.rating) {
      alert("Please complete all required fields.");
      return;
    }
    if (formData.amenities.length === 0) {
      alert("Please select at least one amenity.");
      return;
    }
    const file = fileInputRef.current.files?.[0];
    if (!file) {
      alert("Please upload a photo.");
      return;
    }
    const valid = ["image/jpeg","image/jpg","image/png"];
    if (!valid.includes(file.type)) {
      alert("Invalid file type. Please upload a JPG or PNG image.");
      return;
    }

    // Upload to Supabase
    const fileName = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from("dorm-photos").upload(fileName, file);
    if (uploadError) { console.error(uploadError); alert("Photo upload failed."); return; }

    const { publicUrl } = supabase.storage.from("dorm-photos").getPublicUrl(fileName);
    const submission = { ...formData, photo_url: publicUrl };

    const { error } = await supabase.from("submissions").insert([submission]);
    if (error) { console.error(error); alert("Failed to submit. Please try again."); }
    else { setUploadSuccess(true); }
  };

  const AMENITIES = ["AC","Laundry","Elevator","Kitchen","Study Lounges","WiFi"];

  return (
    <div className="mx-auto rounded-2xl bg-white p-6 shadow">
      {uploadSuccess ? (
        <div className="text-center">
          <h2 className="mb-1 text-3xl font-bold text-[#c8102e]">Success!</h2>
          <p className="text-zinc-700">Your dorm information has been submitted. Thank you!</p>
        </div>
      ) : (
        <>
          <h2 className="mb-6 text-center text-3xl font-bold">Upload Dorm Info</h2>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Basic info */}
            <section className="rounded-xl border border-zinc-200 p-4 shadow-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <Select
                  label="Dorm Name"
                  required
                  value={formData.dorm_name}
                  onChange={(e) => setFormData({ ...formData, dorm_name: e.target.value })}
                  placeholder="Select Dorm"
                >
                  <option value="Barton Hall">Barton Hall</option>
                  <option value="Bray Hall">Bray Hall</option>
                  <option value="Burdett Avenue Residence Hall">BARH</option>
                  <option value="Cary Hall">Cary Hall</option>
                  <option value="Crockett Hall">Crockett Hall</option>
                  <option value="Davison Hall">Davison Hall</option>
                  <option value="Nugent Hall">Nugent Hall</option>
                  <option value="Hall Hall">Hall Hall</option>
                  <option value="Nason Hall">Nason Hall</option>
                  <option value="Sharp Hall">Sharp Hall</option>
                  <option value="Warren Hall">Warren Hall</option>
                  <option value="Beman and Brinsmade(RAHP B)">RAHP B</option>
                  <option value="Blitman Residence Commons">Blitman</option>
                  <option value="Colvin and Albright(RAHP A)">RAHP A</option>
                  <option value="E-Complex">E-Complex</option>
                  <option value="North Hall">North Hall</option>
                  <option value="Quadrangle(Quad)">Quad</option>
                  <option value="Bryckwyck Apartments">Bryckwyck</option>
                  <option value="City Station West">City Station West</option>
                  <option value="Polytechnic Apartments">Polytechnic Apts</option>
                  <option value="Stacwyck Apartments">Stackwyck</option>
                </Select>

                <Select
                  label="Class Year"
                  required
                  value={formData.class_year}
                  onChange={(e) => setFormData({ ...formData, class_year: e.target.value })}
                  placeholder="Select Class Year"
                >
                  {Array.from({ length: 6}, (_, i) =>{
                    const current = new Date().getFullYear();
                    const classYear = current + i + 1;
                    return (
                      <option key={classYear} value={classYear}>
                        Class of {classYear}
                      </option>
                    );
                  })}
                  
                </Select>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-zinc-800">Rating <span className="text-red-500">*</span></label>
                <StarRating
                  value={formData.rating}
                  onChange={(n) => setFormData({ ...formData, rating: n })}
                />
              </div>
            </section>

            {/* Amenities */}
            <section className="rounded-xl border border-zinc-200 p-4 shadow-sm">
              <label className="mb-3 block text-sm font-medium text-zinc-800">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {AMENITIES.map((a) => (
                  <AmenityPill
                    key={a}
                    label={a}
                    checked={formData.amenities.includes(a)}
                    onChange={() => toggleAmenity(a)}
                  />
                ))}
              </div>
            </section>

            {/* Photo */}
            <section className="rounded-xl border border-zinc-200 p-4 shadow-sm">
              <label className="mb-3 block text-sm font-medium text-zinc-800">Upload Photo <span className="text-red-500">*</span></label>
              <FileUpload inputRef={fileInputRef} preview={preview} setPreview={setPreview} required />
            </section>

            {/* Review */}
            <section className="rounded-xl border border-zinc-200 p-4 shadow-sm">
              <label className="mb-2 block text-sm font-medium text-zinc-800">Review (Optional)</label>
              <textarea
                rows="4"
                placeholder="Write a brief review about your dorm experience (optional)"
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                className="w-full rounded-xl border border-zinc-300 bg-white p-3 text-[15px] shadow-sm outline-none transition
                           hover:border-zinc-400 focus:border-[#c8102e] focus:ring-4 focus:ring-[#c8102e]/15"
              />
              <label className="mt-3 flex items-start gap-2 text-sm text-zinc-700">
                <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-zinc-300" />
                <span>I confirm that I am a current RPI student and the information I’m submitting is accurate.</span>
              </label>
            </section>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-[#c8102e] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#a00d24]"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UploadForm;
