import React, { useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const UploadForm = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    dorm_name: '',
    class_year: '',
    rating: '',
    amenities: [],
    review: '',
    photo_url: '',
  });

  const fileInputRef = useRef();

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      const updated = prev.amenities.includes(value)
        ? prev.amenities.filter((item) => item !== value)
        : [...prev.amenities, value];
      return { ...prev, amenities: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation
    if (formData.amenities.length === 0) {
      alert("Please select at least one amenity.");
      return;
    }

    const file = fileInputRef.current.files[0];
    if (!file) {
      alert("Please upload a photo.");
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a JPG or PNG image.");
      return;
    }

    // Upload photo to Supabase
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error: uploadError } = await supabase
      .storage
      .from('dorm-photos')
      .upload(fileName, file);

    if (uploadError) {
      alert('Photo upload failed.');
      console.error(uploadError);
      return;
    }

    const { publicUrl } = supabase.storage.from('dorm-photos').getPublicUrl(fileName);
    const uploadedPhotoUrl = publicUrl;
    

    // should insert data into supabase db
const submission = {
  ...formData,
  photo_url: uploadedPhotoUrl,
};

console.log("Data being submitted to Supabase:", submission);

const { error } = await supabase.from('submissions').insert([submission]);

if (error) {
  console.error("Insert error:", error);
  alert('Failed to submit. Please try again.');
} else {
  setUploadSuccess(true);
}
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow mt-4">
      {uploadSuccess ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#c8102e] mb-2">Success!</h2>
          <p className="text-gray-700">Your dorm information has been submitted. Thank you!</p>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center">Upload Dorm Info</h2>
          <form onSubmit={handleSubmit}>
            {/* Dorm Name */}
            <label className="block text-left mb-2 font-semibold">Dorm Name</label>
            <select
              className="w-full p-3 mb-4 border rounded"
              required
              onChange={(e) => setFormData({ ...formData, dorm_name: e.target.value })}
            >
              <option value="">Select Dorm</option>
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
            </select>

            {/* Class Year */}
            <label className="block text-left mb-2 font-semibold">Class Year</label>
            <select
              className="w-full p-3 mb-4 border rounded"
              required
              onChange={(e) => setFormData({ ...formData, class_year: e.target.value })}
            >
              <option value="">Select Class Year</option>
              <option value="2026">Class of 2026</option>
              <option value="2027">Class of 2027</option>
              <option value="2028">Class of 2028</option>
              <option value="2029">Class of 2029</option>
            </select>

            {/* Rating */}
            <label className="block text-left mb-2 font-semibold">Rating</label>
            <select
              className="w-full p-3 mb-4 border rounded"
              required
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            >
              <option value="">Select Rating</option>
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="3">⭐⭐⭐ (3)</option>
              <option value="2">⭐⭐ (2)</option>
              <option value="1">⭐ (1)</option>
            </select>

            {/* Amenities */}
            <label className="block text-left mb-2 font-semibold">Amenities</label>
            <div className="grid grid-cols-2 gap-2 mb-4 text-left">
              {['AC', 'Laundry', 'Elevator', 'Kitchen', 'Study Lounges', 'WiFi'].map((a) => (
                <label key={a}>
                  <input
                    type="checkbox"
                    value={a}
                    className="mr-2"
                    onChange={handleCheckboxChange}
                  />
                  {a}
                </label>
              ))}
            </div>

            {/* Upload Photo */}
            <label className="block text-left mb-2 font-semibold">Upload Photo</label>
            <input
              type="file"
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png"
              className="w-full mb-4"
              required
            />

            {/* Review (Optional) */}
            <label className="block text-left mb-2 font-semibold">Review (Optional)</label>
            <textarea
              className="w-full p-3 mb-4 border rounded"
              rows="4"
              placeholder="Write a brief review about your dorm experience (optional)"
              onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            ></textarea>

            {/* Terms */}
            <label className="block text-left mb-6">
              <input type="checkbox" required className="mr-2" />
              I confirm that I am a current RPI student and the information I’m submitting is accurate.
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#c8102e] text-white py-2 px-6 rounded font-semibold hover:bg-[#a00d24] transition"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UploadForm;
