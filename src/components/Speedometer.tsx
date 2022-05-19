import { Component, createEffect, createMemo, createSignal } from "solid-js";
import { calculateVelocity, formatVelocity } from "../helpers";
import styles from "./Speedometer.module.css";

export const Speedometer: Component = () => {
  const [velocity, setVelocity] = createSignal(0);
  const [position, setPosition] = createSignal<GeolocationPosition>();

  createEffect(() => {
    navigator.geolocation.watchPosition(newPosition => {
      const oldPosition = position();

      if (!oldPosition) {
        setPosition(newPosition);
        return;
      }

      const newVelocity = calculateVelocity(oldPosition, newPosition);
      if (newVelocity) {
        setVelocity(newVelocity);
      }
    });
  });

  const formattedVelocity = createMemo(() => formatVelocity(velocity()));

  return (
    <div class={styles["speedometer"]}>
      <span class={styles["velocity"]}>{formattedVelocity()}</span>
      <span class={styles["unit"]}>m/s</span>
    </div>
  );
};
