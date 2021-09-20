<template>
  <div class="row g-0">
    <button class="btn-dark pb-10 m-0 col-1" @click="planLeft">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        class="bi bi-arrow-left-circle"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
        />
      </svg>
    </button>
    <div
      style="background-color: var(--bs-dark); color: white"
      class="col"
      v-if="currentPlans[0].name === ''"
    >
      Du Hast noch keinen Plan
      <br />
      Drücke den Knopf um einen zu erstellen
    </div>
    <div
      style="background-color: var(--bs-dark); color: white"
      class="col"
      v-else
    >
      {{ currentPlans[planShown].name }}
      <br />
      Du sparst für: {{ currentPlans[planShown].reason }}
      <br />
      Dir fehlen: {{ currentPlans[planShown].amount }} €
      <br />
      Du sparst: {{ currentPlans[planShown].duration }}Tage
      <br />

      Empfehlung:
      {{ recommendation }}
      pro Tag
    </div>

    <button class="btn-dark pb-10 m-0 col-1" @click="planRight">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        class="bi bi-arrow-right-circle"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
        />
      </svg>
    </button>
  </div>

  <button class="btn btn-dark pb-10 m-4" @click="openPlanCreateModal">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="currentColor"
      class="bi bi-plus-circle"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
      />
    </svg>
  </button>
  <button
    class="btn btn-dark pb-10 m-4"
    @click="openPlanEditModal"
    v-if="currentPlans[0].name != ''"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="currentColor"
      class="bi bi-gear"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
      />
      <path
        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
      />
    </svg>
  </button>
  <button
    class="btn btn-dark pb-10 m-4"
    @click="openPlanDeleteModal"
    v-if="currentPlans[0].name != ''"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="currentColor"
      class="bi bi-trash"
      viewBox="0 0 16 16"
    >
      <path
        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
      />
      <path
        fill-rule="evenodd"
        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
      />
    </svg>
  </button>
  <button class="btn btn-dark pb-10 m-4" @click="openPlanHistoryModal">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="currentColor"
      class="bi bi-clock-history"
      viewBox="0 0 16 16"
    >
      <path
        d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
      />
      <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
      <path
        d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
      />
    </svg>
  </button>
  <!-- new modal -->
  <div id="planCreateModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closePlanCreateModal"
        >&times;</span
      >

      <div class="container">
        <form @submit.prevent="createPlan">
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Für was möchtest du sparen?"
            v-model="planReason"
            required
          />
          <input
            type="number"
            min="1"
            class="form-control mt-1"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Wie Viel möchtest du sparen?"
            v-model="planAmount"
            required
          />
          <input
            type="number"
            min="1"
            class="form-control mt-1"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Wie lange möchtest du sparen?"
            v-model="planDuration"
            required
          />
          <button
            type="submit"
            class="btn btn-primary mt-1"
            style="float: right"
          >
            Bestätigen
          </button>
        </form>
      </div>
    </div>
  </div>
  <!-- new modal -->
  <div id="planEditModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closePlanEditModal"
        >&times;</span
      >

      <div class="container">
        <form @submit.prevent="editPlan">
          <select class="form-select" v-model="selectedPlan">
            <option value="0">Welchen Plan möchtest du überarbeiten?</option>
            <option v-for="plan in currentPlans" :key="plan.name">
              {{ plan.name }}
            </option>
            required
          </select>

          <input
            type="text"
            class="form-control mt-1"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Für was möchtest du sparen?"
            v-model="planReason"
            required
          />
          <input
            type="number"
            class="form-control mt-1"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Wie Viel möchtest du sparen?"
            v-model="planAmount"
            min="1"
            required
          />
          <input
            type="number"
            class="form-control mt-1"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Wie lange möchtest du sparen?"
            v-model="planDuration"
            min="1"
            required
          />
          <button
            type="submit"
            class="btn btn-primary mt-1"
            style="float: right"
          >
            Bestätigen
          </button>
        </form>
      </div>
    </div>
  </div>
  <!-- new modal -->
  <div id="planDeleteModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closePlanDeleteModal"
        >&times;</span
      >
      <div class="container">
        <form @submit.prevent="deletePlan">
          <select class="form-select" v-model="selectedPlan">
            <option value="0">Welchen Plan möchtest du löschen?</option>
            <option v-for="plan in currentPlans" :key="plan.name">
              {{ plan.name }}
            </option>
          </select>

          <button
            type="submit"
            class="btn btn-primary mt-1"
            style="float: right"
          >
            Bestätigen
          </button>
        </form>
      </div>
    </div>
  </div>
  <!-- new modal -->
  <div id="planHistoryModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closePlanHistoryModal"
        >&times;</span
      >
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Planname</th>
              <th scope="col">Spargrund</th>
              <th scope="col">Sparziel</th>
              <th scope="col">Spardauer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ul>
                  <li v-for="plan in allPlans" :key="plan.name">
                    {{ plan.name }}
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  <li v-for="plan in allPlans" :key="plan.reason">
                    {{ plan.reason }}
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  <li v-for="plan in allPlans" :key="plan.amount">
                    {{ plan.amount }}
                  </li>
                </ul>
              </td>
              <td>
                <ul>
                  <li v-for="plan in allPlans" :key="plan.duration">
                    {{ plan.duration }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import "bootstrap/dist/css/bootstrap.css";
import { getData, setData } from "@/API";

interface AllPlan {
  name: string;
  reason: string;
  amount: number | undefined;
  duration: number | undefined;
  deleted: boolean;
}

export default defineComponent({
  data() {
    return {
      planReason: "",
      planAmount: "",
      planDuration: "",
      planShown: 0,
      planCounter: 0,
      selectedPlan: "0",
      currentPlans: [
        {
          name: "",
          reason: "",
          amount: 0,
          duration: 0,
          deleted: false,
        },
      ],
      allPlans: [
        {
          name: "",
          reason: "",
          amount: undefined,
          duration: undefined,
          deleted: false,
        },
      ] as AllPlan[],
    };
  },
  mounted() {
    if (getData("currentPlans").length > 0) {
      this.currentPlans = getData("currentPlans");
    }
    if (getData("allPlans").length > 0) {
      this.allPlans = getData("allPlans");
    }
  },
  methods: {
    planRight() {
      if (this.planShown < this.currentPlans.length - 1) {
        this.planShown++;
      } else {
        this.planShown = 0;
      }
    },
    planLeft() {
      if (this.planShown > 0) {
        this.planShown--;
      } else {
        this.planShown = this.currentPlans.length - 1;
      }
    },
    openPlanCreateModal() {
      var modal = document.getElementById("planCreateModal");
      modal!.style.display = "block";
    },
    closePlanCreateModal() {
      var modal = document.getElementById("planCreateModal");
      modal!.style.display = "none";
      this.planReason = "";
      this.planAmount = "";
      this.planDuration = "";
    },
    openPlanEditModal() {
      var modal = document.getElementById("planEditModal");
      modal!.style.display = "block";
    },
    closePlanEditModal() {
      var modal = document.getElementById("planEditModal");
      modal!.style.display = "none";
      this.selectedPlan = "0";
      this.planReason = "";
      this.planAmount = "";
      this.planDuration = "";
    },
    openPlanDeleteModal() {
      var modal = document.getElementById("planDeleteModal");
      modal!.style.display = "block";
    },
    closePlanDeleteModal() {
      var modal = document.getElementById("planDeleteModal");
      modal!.style.display = "none";
      this.selectedPlan = "0";
    },
    openPlanHistoryModal() {
      var modal = document.getElementById("planHistoryModal");
      modal!.style.display = "block";
    },
    closePlanHistoryModal() {
      var modal = document.getElementById("planHistoryModal");
      modal!.style.display = "none";
    },
    createPlan() {
      let newPlan = {
        name: `Plan ${this.allPlans.length}`,
        reason: this.planReason,
        amount: parseInt(this.planAmount),
        duration: parseInt(this.planDuration),
        deleted: false,
      };
      if (this.currentPlans[0].name == "") {
        this.currentPlans[0] = newPlan;
        this.allPlans.push(newPlan);
      } else {
        this.currentPlans.push(newPlan);
        this.allPlans.push(newPlan);
      }
      this.planCounter++;

      setData("currentPlans", this.currentPlans);
      setData("allPlans", this.allPlans);

      this.planShown = this.currentPlans.length - 1;
      this.closePlanCreateModal();
    },
    editPlan() {
      let i = 0;
      if (this.selectedPlan.length > 6) {
        i = parseInt(this.selectedPlan[5]);
        i += parseInt(this.selectedPlan[6]);
      } else {
        i = parseInt(this.selectedPlan[5]);
      }
      this.currentPlans[i - 1].reason = this.planReason;
      this.currentPlans[i - 1].amount = parseInt(this.planAmount);
      this.currentPlans[i - 1].duration = parseInt(this.planDuration);
      setData("currentPlans", this.currentPlans);
      setData("allPlans", this.allPlans);
      this.allPlans[i - 1].reason = this.planReason;
      this.allPlans[i - 1].amount = parseInt(this.planAmount);
      this.allPlans[i - 1].duration = parseInt(this.planDuration);
      this.closePlanEditModal();
    },
    deletePlan() {
      let i = 0;
      for (i = 0; this.selectedPlan != this.currentPlans[i].name; i++) {
        console.log(i);
      }
      this.currentPlans.splice(i, 1);
      this.closePlanDeleteModal();
      this.planRight();
      setData("currentPlans", this.currentPlans);
    },
  },
  computed: {
    recommendation: function () {
      let i = 0;
      if (this.currentPlans[this.planShown].duration) {
        if (this.currentPlans[this.planShown].duration != 0) {
          i = parseInt(
            (
              this.currentPlans[this.planShown].amount /
              this.currentPlans[this.planShown].duration
            ).toFixed(2)
          );
        } else {
          i = this.currentPlans[this.planShown].amount;
        }
      }
      return i;
    },
  },
});
</script>
<style scoped>
</style>
