import { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./MortgageCalculator.module.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const MortgageCalculator = () => {
  const downPaymentRef = useRef();
  const interesetRateRef = useRef();
  const loanPeriodRef = useRef();
  const propertyPriceRef = useRef();
  const loanAmountRef = useRef();
  const monthlyRepaymentRef = useRef();

  const [loanDetails, setLoanDetails] = useState({});

  const navigate = useNavigate();

  const [cookie] = useCookies();
  const token = cookie.token;
  const id = cookie.id;

  const resetInputHandler = () => {
    if (!token) {
      return toast.error("Please login to access this feature");
    }

    downPaymentRef.current.value = "";
    interesetRateRef.current.value = "";
    loanPeriodRef.current.value = "";
    propertyPriceRef.current.value = "";
    loanAmountRef.current.value = "";
    monthlyRepaymentRef.current.value = "";
  };

  const calculateMortgageHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Please login to access this feature");
    }

    if (
      downPaymentRef.current.value === "" ||
      interesetRateRef.current.value === "" ||
      loanPeriodRef.current.value === "" ||
      propertyPriceRef.current.value === ""
    ) {
      return toast.error("Please fill in the fields below.");
    }

    const input = {
      downpayment: downPaymentRef.current.value,
      interest_rate: interesetRateRef.current.value,
      loan_period: loanPeriodRef.current.value,
      property_price: propertyPriceRef.current.value,
    };

    const response = await fetch(`http://localhost:3000/api/profile/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      return toast.error("Something went wrong when calculating mortgage.");
    }

    const profile_response = await fetch(
      `http://localhost:3000/api/profile/${id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (!profile_response.ok) {
      return toast.error(
        "Something went wrong when fetching your monthly repayment"
      );
    }

    const data = await profile_response.json();

    setLoanDetails({
      monthly: data.profile.user_finance.monthly.toFixed(2),
      amount: data.profile.user_finance.loan_amt,
    });

    monthlyRepaymentRef.current.value =
      data.profile.user_finance.monthly.toFixed(2);
    loanAmountRef.current.value = data.profile.user_finance.loan_amt;

    return toast.success("Mortgage calculated.");
  };

  useEffect(() => {
    const getMonthlyRepayment = async () => {
      const response = await fetch(`http://localhost:3000/api/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        return toast.error(
          "Something went wrong when fetching your monthly repayment"
        );
      }

      const data = await response.json();

      setLoanDetails({
        monthly: data.profile.user_finance.monthly.toFixed(2),
        amount: data.profile.user_finance.loan_amt,
      });

      monthlyRepaymentRef.current.value =
        data.profile.user_finance.monthly.toFixed(2);
      loanAmountRef.current.value = data.profile.user_finance.loan_amt;
    };
    if (token) {
      getMonthlyRepayment();
    }
  }, [id, token]);

  return (
    <form>
      <Card className={classes["card-style"]}>
        <h1>Mortgage Calculator</h1>
        <div className={classes["mortgage-input-wrapper"]}>
          <Input
            ref={downPaymentRef}
            type="number"
            label="Down Payment (S$)"
            required
          />
          <Input
            ref={interesetRateRef}
            type="number"
            label="Interest Rate (%)"
            required
          />
        </div>
        <div className={classes["mortgage-input-wrapper"]}>
          <Input
            ref={loanPeriodRef}
            type="number"
            label="Loan Period (Year)"
            required
          />
          <Input
            ref={propertyPriceRef}
            type="number"
            label="Property Price (S$)"
            required
          />
        </div>
        <div className={classes["mortgage-input-wrapper"]}>
          <Input
            ref={loanAmountRef}
            label="Loan Amount (S$)"
            type="number"
            defaultValue={loanDetails.amount}
            disabled
          />
          <Input
            ref={monthlyRepaymentRef}
            label="Monthly Repayment (S$)"
            type="number"
            defaultValue={loanDetails.monthly}
            disabled
          />
        </div>
        <div className={classes["mortgage-button-wrapper"]}>
          <Button
            type="submit"
            style="primary"
            onClick={calculateMortgageHandler}
          >
            Calculate
          </Button>
          <Button type="button" style="underline" onClick={resetInputHandler}>
            Reset
          </Button>
          <Button type="button" style="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default MortgageCalculator;
