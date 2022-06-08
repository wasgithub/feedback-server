import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "teste unitario",
        screenshot: "data:image/png;base64",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(sendMailSpy).toBeCalled();
  });

  it("should be able to submit a feedback", () => {
    expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "teste unitario",
        screenshot: "data:image/png;base64,7878787",
      })
    ).resolves.not.toThrow();
  });

  it("should not be able to submit feedback without type", () => {
    expect(
      submitFeedback.execute({
        type: "",
        comment: "teste unitario",
        screenshot: "data:image/png;base64,7878787",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", () => {
    expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,7878787",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with an invalid screenshot", () => {
    expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "teste",
        screenshot: "teste.jpg",
      })
    ).rejects.toThrow();
  });
});
