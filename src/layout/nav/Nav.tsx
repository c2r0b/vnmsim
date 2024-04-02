import React, { useState } from "react";
import { useT } from "@transifex/react";
import {
  Microscope24Regular,
  Beaker24Regular,
  CalendarStar24Regular,
  ChatHelp24Regular,
  FolderOpen24Regular,
  Save24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

import DropZone from "../dropZone/DropZone";
import Help from "../../modals/help";
import Samples from "../../modals/samples";
import Settings from "../../modals/settings";
import Stats from "../../modals/stats";

import { readFile, readFileTauri, save } from "../../utility/io";

import { setError } from "src/store/errors.slice";
import { isSimulatorRunning } from "src/selectors";
import { useAppDispatch, useAppSelector } from "src/hooks/store";
import { SimulatorState } from "src/types/simulatorState";
import { load } from "src/middleware/load";

import * as Styled from "./nav.styles";
import NewConfirm from "./NewConfirm";

const acceptedFileTypes = "application/json,.vnsp";

const Nav = () => {
  const dispatch = useAppDispatch();

  const isRunning = useAppSelector(isSimulatorRunning);
  const sim = useAppSelector((state) => state.sim);
  const ram = useAppSelector((state) => state.ram);
  const ir = useAppSelector((state) => state.ir);
  const pc = useAppSelector((state) => state.pc);
  const alu = useAppSelector((state) => state.alu);

  const t = useT();

  const [selPanel, setSelPanel] = useState("");

  const onOpen = (input) => {
    const onError = () => {
      dispatch(setError(t("Unable to load the selected file")));
    };

    const onSuccess = (obj: SimulatorState) => {
      dispatch(load(obj.toData()));
    };

    readFile(input, onSuccess, onError);
  };

  const onSave = () =>
    save({
      obj: new SimulatorState({ sim, ram, ir, pc, alu }).toJSON(),
      title: sim.title,
      date: sim.created,
    });

  const handleOpenClick = async () => {
    if ("__TAURI_INTERNALS__" in window) {
      onOpen(await readFileTauri());
    } else {
      document.getElementById("openProject")?.click();
    }
  };

  const _menuItems = [
    {
      key: "new",
      label: t("New project"),
      icon: <CalendarStar24Regular />,
      disabled: isRunning,
      onClick: () => setSelPanel("newConfirm"),
    },
    {
      key: "open",
      label: t("Open from file"),
      icon: <FolderOpen24Regular />,
      disabled: isRunning,
      onClick: () => handleOpenClick(),
    },
    {
      key: "save",
      label: t("Save to file"),
      disabled: isRunning,
      icon: <Save24Regular />,
      onClick: onSave,
    },
    {
      key: "samples",
      label: t("Samples"),
      icon: <Beaker24Regular />,
      onClick: () => setSelPanel("samples"),
    },
    {
      key: "stats",
      label: t("Statistics"),
      icon: <Microscope24Regular />,
      onClick: () => setSelPanel("stats"),
    },
    {
      key: "help",
      label: t("Help"),
      icon: <ChatHelp24Regular />,
      onClick: () => setSelPanel("help"),
    },
    {
      key: "settings",
      label: t("Settings"),
      icon: <Settings24Regular />,
      onClick: () => setSelPanel("settings"),
    },
  ];

  const menuItems = _menuItems.map((props) => {
    return (
      <Styled.MenuItem key={props.key}>
        <Styled.MenuButton
          aria-label={props.label}
          icon={props.icon}
          disabled={props.disabled}
          onClick={props.onClick}
          appearance="transparent"
        >
          {props.label}
        </Styled.MenuButton>
      </Styled.MenuItem>
    );
  });

  return (
    <>
      <NewConfirm
        show={selPanel == "newConfirm"}
        onDismiss={() => setSelPanel("")}
      />
      <Help show={selPanel == "help"} onDismiss={() => setSelPanel("")} />
      <Samples show={selPanel == "samples"} onDismiss={() => setSelPanel("")} />
      <Settings
        show={selPanel == "settings"}
        onDismiss={() => setSelPanel("")}
      />
      <Stats show={selPanel == "stats"} onDismiss={() => setSelPanel("")} />

      <DropZone onOpen={onOpen} />

      <Styled.Input
        type="file"
        id="openProject"
        accept={acceptedFileTypes}
        onChange={(e) => {
          if (!e.target.files?.length) return;
          onOpen(e.target.files[0]);
        }}
      />

      <Styled.Container>{menuItems}</Styled.Container>
    </>
  );
};

export default Nav;
