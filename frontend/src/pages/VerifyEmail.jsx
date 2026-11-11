import { useRef } from "react"

function VerifyEmail() {
  const inputRefs = useRef([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let otpString = '';

    inputRefs.current.forEach((e) => {
      otpString += e.value;
    })


    const otp = Number(otp);
  }

  const handleInputEnter = (e, idx) => {
    const value = e.target.value.replace(/\D/g, "");

    e.target.value = value;

    if (value && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1].focus();
    }
  }

  const handleInputDelete = (e, idx) => {
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  }

  const handleInputPaste = (e) => {
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, "").split("");

    pasteData.forEach((digit, idx) => {
      inputRefs.current[idx].value = digit;
    })
  }


  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col items-center gap-4">
        <h1 className="font-bold text-3xl text-center">Verify email</h1>
        <p className="text-lg">Enter the OTP sent to your mail</p>

        <div onPaste={handleInputPaste} className="w-full flex justify-between">
          {Array(6).fill(0).map((_, idx) => (
            <input
              type="text"
              inputMode="numeric"
              key={idx}
              maxLength={1}
              ref={(e) => inputRefs.current[idx] = e}
              className="w-12 h-12 border-2 border-cyan-400 outline-none rounded-lg text-center font-bold text-xl"
              onChange={(e) => handleInputEnter(e, idx)}
              onKeyDown={(e) => handleInputDelete(e, idx)}
            />
          ))}
        </div>

        <button type="submit" className="text-black text-lg bg-cyan-400 px-3 py-2 font-bold rounded-full cursor-pointer w-full hover:scale-95 duration-300 hover:bg-cyan-600 mt-7 active:bg-cyan-600 active:scale-95">
          Submit
        </button>

        <p className="underline text-blue-600 cursor-pointer">Resend otp?</p>
      </form>
    </div>
  )
}

export default VerifyEmail